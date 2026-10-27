import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Common "../types/common";
import DietTypes "../types/diet";

module {
  public type State = Map.Map<Common.UserId, List.List<DietTypes.DietFavorite>>;

  public func getFavorites(state : State, caller : Common.UserId) : [DietTypes.DietFavorite] {
    switch (Map.get<Common.UserId, List.List<DietTypes.DietFavorite>>(state, caller, Principal.equal)) {
      case (?favorites) List.toArray(favorites);
      case (null) [];
    };
  };

  public func addFavorite(state : State, caller : Common.UserId, nextId : Nat, mealName : Text, mealType : Text, ingredients : Text, nutritionalInfo : Text) : Nat {
    let newFavorite : DietTypes.DietFavorite = {
      id = nextId;
      mealName = mealName;
      mealType = mealType;
      ingredients = ingredients;
      nutritionalInfo = nutritionalInfo;
      timestamp = Time.now();
    };
    
    let currentFavorites = switch (Map.get<Common.UserId, List.List<DietTypes.DietFavorite>>(state, caller, Principal.equal)) {
      case (?f) f;
      case (null) List.nil();
    };
    
    let updatedFavorites = List.push<DietTypes.DietFavorite>(newFavorite, currentFavorites);
    Map.put<Common.UserId, List.List<DietTypes.DietFavorite>>(state, caller, Principal.equal, updatedFavorites);
    
    nextId + 1
  };

  public func removeFavorite(state : State, caller : Common.UserId, id : Common.EntryId) : Bool {
    switch (Map.get<Common.UserId, List.List<DietTypes.DietFavorite>>(state, caller, Principal.equal)) {
      case (?favorites) {
        let filteredFavorites = List.filter<DietTypes.DietFavorite>(favorites, func(f) = f.id != id);
        Map.put<Common.UserId, List.List<DietTypes.DietFavorite>>(state, caller, Principal.equal, filteredFavorites);
        true
      };
      case (null) false;
    };
  };
};
