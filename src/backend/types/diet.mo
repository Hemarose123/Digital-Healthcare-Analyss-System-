import Common "common";

module {
  public type DietFavorite = {
    id : Common.EntryId;
    mealName : Text;
    mealType : Text;
    ingredients : Text;
    nutritionalInfo : Text;
    timestamp : Common.Timestamp;
  };
};
