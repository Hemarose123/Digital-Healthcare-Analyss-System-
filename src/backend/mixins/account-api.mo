import ProfileLib "../lib/profile";
import MoodLib "../lib/mood";
import SymptomLib "../lib/symptom";
import MedicineLib "../lib/medicine";
import TimelineLib "../lib/timeline";
import HabitLib "../lib/habit";
import PrescriptionLib "../lib/prescription";
import DietLib "../lib/diet";
import ExerciseLib "../lib/exercise";
import ChatLib "../lib/chat";

mixin (
  profileState : ProfileLib.State,
  moodState : MoodLib.State,
  symptomState : SymptomLib.State,
  medicineState : MedicineLib.State,
  timelineState : TimelineLib.State,
  habitState : HabitLib.State,
  prescriptionState : PrescriptionLib.State,
  dietState : DietLib.State,
  exerciseState : ExerciseLib.State,
  chatState : ChatLib.State,
) {

  public shared ({ caller }) func deleteAccount() : async () {
    // Delete all user data across all modules
    ProfileLib.deleteAccount(profileState, caller);
  };

};
