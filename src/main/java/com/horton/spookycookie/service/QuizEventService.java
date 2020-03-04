package com.horton.spookycookie.service;

import com.google.gson.Gson;
import com.horton.spookycookie.dto.QuizEvent;
import com.horton.spookycookie.dto.QuizEventList;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * @author David Horton
 * Date:   3/3/20
 */
@Service
public class QuizEventService {

    public static long broadcastTimeoutMilliseonds = 6_000_000;
    public static long broadcastReleaseMilliseonds = 300_000;
    public static long broadcastDelayMilliseconds = 5000;
    private volatile static String eventsJson = "{}";

    public QuizEventList getQuizEventList() {
        return new Gson().fromJson(eventsJson, QuizEventList.class);
    }

    public QuizEvent registerEvent(QuizEvent quizEvent) {
        final QuizEventList newList = new QuizEventList();
        final QuizEventList oldList = new Gson().fromJson(eventsJson, QuizEventList.class);
        final long now = new Date().getTime();
        for(QuizEvent oldEvent : oldList.getQuizEvents()) {
            if(oldEvent.getServerTime() > now - broadcastReleaseMilliseonds) {
                newList.getQuizEvents().add(oldEvent);
            }
        }
        quizEvent.setServerTime(now);
        newList.getQuizEvents().add(quizEvent);
        eventsJson = new Gson().toJson(newList);
        return quizEvent;
    }
}
