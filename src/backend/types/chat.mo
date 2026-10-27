import Common "common";

module {
  public type ChatMessage = {
    id : Common.EntryId;
    timestamp : Common.Timestamp;
    message : Text;
    isBot : Bool;
    language : Text;
  };
};
