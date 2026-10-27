import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Common "../types/common";
import ExerciseTypes "../types/exercise";

module {
  public type State = Map.Map<Common.UserId, List.List<ExerciseTypes.ExerciseCompletion>>;

  public func getCompletions(state : State, caller : Common.UserId) : [ExerciseTypes.ExerciseCompletion] {
    switch (Map.get<Common.UserId, List.List<ExerciseTypes.ExerciseCompletion>>(state, caller, Principal.equal)) {
      case (?completions) List.toArray(completions);
      case (null) [];
    };
  };

  public func addCompletion(state : State, caller : Common.UserId, nextId : Nat, exerciseName : Text, category : Text, durationMins : Nat) : Nat {
    let newCompletion : ExerciseTypes.ExerciseCompletion = {
      id = nextId;
      exerciseName = exerciseName;
      category = category;
      durationMins = durationMins;
      timestamp = Time.now();
    };
    
    let currentCompletions = switch (Map.get<Common.UserId, List.List<ExerciseTypes.ExerciseCompletion>>(state, caller, Principal.equal)) {
      case (?c) c;
      case (null) List.nil();
    };
    
    let updatedCompletions = List.push<ExerciseTypes.ExerciseCompletion>(newCompletion, currentCompletions);
    Map.put<Common.UserId, List.List<ExerciseTypes.ExerciseCompletion>>(state, caller, Principal.equal, updatedCompletions);
    
    nextId + 1
  };
};
