import Map "mo:core/Map";
import ProfileLib "../lib/profile";
import Common "../types/common";
import ProfileTypes "../types/profile";

mixin (profileState : ProfileLib.State) {

  public shared query ({ caller }) func getUserProfile() : async ?ProfileLib.UserProfilePublic {
    ProfileLib.getProfile(profileState, caller)
  };

  public shared ({ caller }) func saveUserProfile(
    name : Text,
    age : Nat,
    gender : Text,
    lifestyle : ProfileTypes.Lifestyle,
    healthGoals : [Text],
    onboardingComplete : Bool,
  ) : async () {
    ProfileLib.saveProfile(profileState, caller, name, age, gender, lifestyle, healthGoals, onboardingComplete);
  };

};
