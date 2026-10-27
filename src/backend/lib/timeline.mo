import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Common "../types/common";
import TimelineTypes "../types/timeline";

module {
  public type State = Map.Map<Common.UserId, List.List<TimelineTypes.TimelineEvent>>;

  public func getEvents(state : State, caller : Common.UserId) : [TimelineTypes.TimelineEvent] {
    switch (Map.get<Common.UserId, List.List<TimelineTypes.TimelineEvent>>(state, caller, Principal.equal)) {
      case (?events) List.toArray(events);
      case (null) [];
    };
  };

  public func addEvent(state : State, caller : Common.UserId, nextId : Nat, eventType : Text, title : Text, description : Text, eventData : Text) : Nat {
    let newEvent : TimelineTypes.TimelineEvent = {
      id = nextId;
      eventType = eventType;
      timestamp = Time.now();
      title = title;
      description = description;
      eventData = eventData;
    };
    
    let currentEvents = switch (Map.get<Common.UserId, List.List<TimelineTypes.TimelineEvent>>(state, caller, Principal.equal)) {
      case (?e) e;
      case (null) List.nil();
    };
    
    let updatedEvents = List.push<TimelineTypes.TimelineEvent>(newEvent, currentEvents);
    Map.put<Common.UserId, List.List<TimelineTypes.TimelineEvent>>(state, caller, Principal.equal, updatedEvents);
    
    nextId + 1
  };
};
