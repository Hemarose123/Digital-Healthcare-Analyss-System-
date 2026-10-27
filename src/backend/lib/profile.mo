import Map "mo:core/Map";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Common "../types/common";
import ProfileTypes "../types/profile";

module {
  public type State = Map.Map<Common.UserId, ProfileTypes.UserProfile>;

  // Public API types (shared-safe, no var fields)
  public type UserProfilePublic = {
    name : Text;
    age : Nat;
    gender : Text;
    lifestyle : ProfileTypes.Lifestyle;
    healthGoals : [Text];
    createdAt : Common.Timestamp;
    onboardingComplete : Bool;
  };

  public func getProfile(state : State, caller : Common.UserId) : ?UserProfilePublic {
    switch (Map.get<Common.UserId, ProfileTypes.UserProfile>(state, caller, Principal.equal)) {
      case (?profile) {
        ?{
          name = profile.name;
          age = profile.age;
          gender = profile.gender;
          lifestyle = profile.lifestyle;
          healthGoals = profile.healthGoals;
          createdAt = profile.createdAt;
          onboardingComplete = profile.onboardingComplete;
        }
      };
      case (null) null;
    }
  };

  public func saveProfile(state : State, caller : Common.UserId, name : Text, age : Nat, gender : Text, lifestyle : ProfileTypes.Lifestyle, healthGoals : [Text], onboardingComplete : Bool) : () {
    let profile : ProfileTypes.UserProfile = {
      var name = name;
      var age = age;
      var gender = gender;
      var lifestyle = lifestyle;
      var healthGoals = healthGoals;
      var createdAt = Time.now();
      var onboardingComplete = onboardingComplete;
    };
    Map.put<Common.UserId, ProfileTypes.UserProfile>(state, caller, Principal.equal, profile);
  };

  public func deleteAccount(state : State, caller : Common.UserId) : () {
    Map.delete<Common.UserId, ProfileTypes.UserProfile>(state, caller, Principal.equal);
  };
};
