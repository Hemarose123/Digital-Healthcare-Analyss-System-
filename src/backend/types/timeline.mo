import Common "common";

module {
  public type TimelineEvent = {
    id : Common.EntryId;
    eventType : Text;
    timestamp : Common.Timestamp;
    title : Text;
    description : Text;
    eventData : Text; // JSON serialized
  };
};
