import Map "mo:core/Map";
import Principal "mo:base/Principal";
import Common "../types/common";
import HabitTypes "../types/habit";

module {
  public type State = Map.Map<Common.UserId, Map.Map<Text, HabitTypes.HabitData>>;

  // Shared-safe public type
  public type HabitDataPublic = {
    date : Text;
    waterGlasses : Nat;
    sleepHours : Float;
    steps : Nat;
  };

  public func getData(state : State, caller : Common.UserId) : [HabitDataPublic] {
    switch (Map.get<Common.UserId, Map.Map<Text, HabitTypes.HabitData>>(state, caller, Principal.equal)) {
      case (?userHabits) {
        let habitEntries = Map.toArray<Text, HabitTypes.HabitData>(userHabits);
        Array.map<(Text, HabitTypes.HabitData), HabitDataPublic>(habitEntries, func((_, habit)) = {
          date = habit.date;
          waterGlasses = habit.waterGlasses;
          sleepHours = habit.sleepHours;
          steps = habit.steps;
        })
      };
      case (null) [];
    };
  };

  public func saveData(state : State, caller : Common.UserId, date : Text, waterGlasses : Nat, sleepHours : Float, steps : Nat) : () {
    let habitData : HabitTypes.HabitData = {
      date = date;
      var waterGlasses = waterGlasses;
      var sleepHours = sleepHours;
      var steps = steps;
    };
    
    let userHabits = switch (Map.get<Common.UserId, Map.Map<Text, HabitTypes.HabitData>>(state, caller, Principal.equal)) {
      case (?h) h;
      case (null) Map.new<Text, HabitTypes.HabitData>();
    };
    
    Map.put<Text, HabitTypes.HabitData>(userHabits, date, Text.equal, habitData);
    Map.put<Common.UserId, Map.Map<Text, HabitTypes.HabitData>>(state, caller, Principal.equal, userHabits);
  };
};
