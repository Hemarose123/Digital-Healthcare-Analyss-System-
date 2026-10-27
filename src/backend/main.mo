import Map "mo:core/Map";
import List "mo:core/List";

import ProfileLib "lib/profile";
import MoodLib "lib/mood";
import SymptomLib "lib/symptom";
import MedicineLib "lib/medicine";
import TimelineLib "lib/timeline";
import HabitLib "lib/habit";
import PrescriptionLib "lib/prescription";
import DietLib "lib/diet";
import ExerciseLib "lib/exercise";
import ChatLib "lib/chat";

import ProfileApi "mixins/profile-api";
import MoodApi "mixins/mood-api";
import SymptomApi "mixins/symptom-api";
import MedicineApi "mixins/medicine-api";
import TimelineApi "mixins/timeline-api";
import HabitApi "mixins/habit-api";
import PrescriptionApi "mixins/prescription-api";
import DietApi "mixins/diet-api";
import ExerciseApi "mixins/exercise-api";
import ChatApi "mixins/chat-api";
import AccountApi "mixins/account-api";

actor {
  // --- Shared state ---
  let profileState : ProfileLib.State = Map.empty();
  let moodState : MoodLib.State = Map.empty();
  let symptomState : SymptomLib.State = Map.empty();
  let medicineState : MedicineLib.State = Map.empty();
  let timelineState : TimelineLib.State = Map.empty();
  let habitState : HabitLib.State = Map.empty();
  let prescriptionState : PrescriptionLib.State = Map.empty();
  let dietState : DietLib.State = Map.empty();
  let exerciseState : ExerciseLib.State = Map.empty();
  let chatState : ChatLib.State = Map.empty();

  // --- Mixins ---
  include ProfileApi(profileState);
  include MoodApi(moodState);
  include SymptomApi(symptomState);
  include MedicineApi(medicineState);
  include TimelineApi(timelineState);
  include HabitApi(habitState);
  include PrescriptionApi(prescriptionState);
  include DietApi(dietState);
  include ExerciseApi(exerciseState);
  include ChatApi(chatState);
  include AccountApi(profileState, moodState, symptomState, medicineState, timelineState, habitState, prescriptionState, dietState, exerciseState, chatState);
};
