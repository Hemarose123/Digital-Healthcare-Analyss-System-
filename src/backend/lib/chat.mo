import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Common "../types/common";
import ChatTypes "../types/chat";

module {
  public type State = Map.Map<Common.UserId, List.List<ChatTypes.ChatMessage>>;

  public func getHistory(state : State, caller : Common.UserId) : [ChatTypes.ChatMessage] {
    switch (Map.get<Common.UserId, List.List<ChatTypes.ChatMessage>>(state, caller, Principal.equal)) {
      case (?history) List.toArray(history);
      case (null) [];
    };
  };

  public func addMessage(state : State, caller : Common.UserId, nextId : Nat, message : Text, isBot : Bool, language : Text) : Nat {
    let newMessage : ChatTypes.ChatMessage = {
      id = nextId;
      timestamp = Time.now();
      message = message;
      isBot = isBot;
      language = language;
    };
    
    let currentHistory = switch (Map.get<Common.UserId, List.List<ChatTypes.ChatMessage>>(state, caller, Principal.equal)) {
      case (?h) h;
      case (null) List.nil();
    };
    
    let updatedHistory = List.push<ChatTypes.ChatMessage>(newMessage, currentHistory);
    Map.put<Common.UserId, List.List<ChatTypes.ChatMessage>>(state, caller, Principal.equal, updatedHistory);
    
    nextId + 1
  };

  public func clearHistory(state : State, caller : Common.UserId) : () {
    Map.put<Common.UserId, List.List<ChatTypes.ChatMessage>>(state, caller, Principal.equal, List.nil());
  };
};
