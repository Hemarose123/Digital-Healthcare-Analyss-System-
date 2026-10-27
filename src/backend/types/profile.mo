import Common "common";

module {
  public type Lifestyle = { #sedentary; #active; #athletic };

  public type UserProfile = {
    var name : Text;
    var age : Nat;
    var gender : Text;
    var lifestyle : Lifestyle;
    var healthGoals : [Text];
    var createdAt : Common.Timestamp;
    var onboardingComplete : Bool;
  };
};
