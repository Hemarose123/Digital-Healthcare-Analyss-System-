import DietLib "../lib/diet";
import Common "../types/common";
import DietTypes "../types/diet";

mixin (dietState : DietLib.State) {

  var nextDietId : Nat = 0;

  public shared query ({ caller }) func getDietFavorites() : async [DietTypes.DietFavorite] {
    DietLib.getFavorites(dietState, caller)
  };

  public shared ({ caller }) func addDietFavorite(
    mealName : Text,
    mealType : Text,
    ingredients : Text,
    nutritionalInfo : Text,
  ) : async Nat {
    let result = DietLib.addFavorite(dietState, caller, nextDietId, mealName, mealType, ingredients, nutritionalInfo);
    nextDietId := result;
    result
  };

  public shared ({ caller }) func removeDietFavorite(id : Common.EntryId) : async Bool {
    DietLib.removeFavorite(dietState, caller, id)
  };

};
