package com.horton.spookycookie.dto;

/**
 * @author David Horton
 * Date:   3/2/20
 */
public class QuizEvent {
    private long serverTime;
    private String eventText;
    private long sessionID;

    public long getServerTime() {
        return serverTime;
    }

    public void setServerTime(long serverTime) {
        this.serverTime = serverTime;
    }

    public String getEventText() {
        return eventText;
    }

    public void setEventText(String eventText) {
        this.eventText = eventText;
    }

    public long getSessionID() {
        return sessionID;
    }

    public void setSessionID(long sessionID) {
        this.sessionID = sessionID;
    }
}
