import Runtime "mo:core/Runtime";
import Common "../types/common";
import ChatTypes "../types/chat";
import ChatLib "../lib/chat";

mixin (chatState : ChatLib.State) {

  var nextChatId : Nat = 0;

  public shared query ({ caller }) func getChatHistory() : async [ChatTypes.ChatMessage] {
    ChatLib.getHistory(chatState, caller);
  };

  public shared ({ caller }) func addChatMessage(
    message : Text,
    isBot : Bool,
    language : Text,
  ) : async Nat {
    let result = ChatLib.addMessage(chatState, caller, nextChatId, message, isBot, language);
    nextChatId := result;
    nextChatId
  };

  public shared ({ caller }) func clearChatHistory() : async () {
    ChatLib.clearHistory(chatState, caller);
  };

};
