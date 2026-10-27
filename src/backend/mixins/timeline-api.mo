import TimelineLib "../lib/timeline";
import Common "../types/common";
import TimelineTypes "../types/timeline";

mixin (timelineState : TimelineLib.State) {

  var nextTimelineId : Nat = 0;

  public shared query ({ caller }) func getHealthTimeline() : async [TimelineTypes.TimelineEvent] {
    TimelineLib.getEvents(timelineState, caller)
  };

  public shared ({ caller }) func addTimelineEvent(
    eventType : Text,
    title : Text,
    description : Text,
    eventData : Text,
  ) : async Nat {
    let result = TimelineLib.addEvent(timelineState, caller, nextTimelineId, eventType, title, description, eventData);
    nextTimelineId := result;
    result
  };

};
