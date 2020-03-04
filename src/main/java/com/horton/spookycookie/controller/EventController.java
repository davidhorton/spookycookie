package com.horton.spookycookie.controller;

import com.google.gson.Gson;
import com.horton.spookycookie.dto.QuizEvent;
import com.horton.spookycookie.dto.QuizEventList;
import com.horton.spookycookie.service.QuizEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import reactor.core.publisher.Flux;

import java.util.Date;

/**
 * @author David Horton
 * Date:   3/2/20
 */
@Controller
@RequestMapping("api/event")
public class EventController {

    private final QuizEventService quizEventService;

    @Autowired
    public EventController(QuizEventService quizEventService) {
        this.quizEventService = quizEventService;
    }

    @RequestMapping(path = "stream", method = RequestMethod.GET, produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> userEventStream() {
        return Flux.push(sink -> {
            Thread t = new Thread(() -> {
                long startTime = new Date().getTime();
                long loopTime = new Date().getTime();
                while(loopTime < startTime + QuizEventService.broadcastTimeoutMilliseonds) {
                    try {
                        Thread.sleep(QuizEventService.broadcastDelayMilliseconds);
                    }
                    catch (Exception e) {
                        e.printStackTrace();
                    }

                    int publishCounter = 0;
                    final QuizEventList quizEventList = quizEventService.getQuizEventList();
                    final long now = new Date().getTime();
                    loopTime = now;
                    for(QuizEvent quizEvent : quizEventList.getQuizEvents()) {
                        if(quizEvent.getServerTime() > now - QuizEventService.broadcastDelayMilliseconds ) {
                            sink.next(new Gson().toJson(quizEvent));
                            publishCounter++;
                            if(publishCounter >= 3) {
                                break;
                            }
                        }
                    }
                }
                sink.complete();
            });
            t.setName("UserActionEventStream");
            t.start();
        });
    }

}
