import ExerciseLib "../lib/exercise";
import Common "../types/common";
import ExerciseTypes "../types/exercise";

mixin (exerciseState : ExerciseLib.State) {

  var nextExerciseId : Nat = 0;

  public shared query ({ caller }) func getExerciseCompletions() : async [ExerciseTypes.ExerciseCompletion] {
    ExerciseLib.getCompletions(exerciseState, caller)
  };

  public shared ({ caller }) func addExerciseCompletion(
    exerciseName : Text,
    category : Text,
    durationMins : Nat,
  ) : async Nat {
    let result = ExerciseLib.addCompletion(exerciseState, caller, nextExerciseId, exerciseName, category, durationMins);
    nextExerciseId := result;
    result
  };

};
