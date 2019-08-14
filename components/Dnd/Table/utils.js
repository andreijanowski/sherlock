const OVERLOAD = "OVERLOAD";
const TAKEN = "TAKEN";
const HOVER = "HOVER";
const FREE = "FREE";

export const calcTableAvailibilityStatus = (
  currentReservation,
  numberOfSeats,
  isDraggingOver
) => {
  if (currentReservation) {
    if (currentReservation.partySize > numberOfSeats) {
      return OVERLOAD;
    }
    return TAKEN;
  }
  if (isDraggingOver) {
    return HOVER;
  }
  return FREE;
};

export const calcTableColor = (availibilityStatus, colors) => {
  switch (availibilityStatus) {
    case OVERLOAD: {
      return colors.ruby;
    }
    case TAKEN: {
      return colors.green;
    }
    case HOVER: {
      return colors.blue;
    }
    default: {
      return colors.linkWater;
    }
  }
};

export const calcChairsColor = (availibilityStatus, colors) => {
  switch (availibilityStatus) {
    case OVERLOAD: {
      return colors.ruby;
    }
    case TAKEN: {
      return colors.green;
    }
    default: {
      return colors.blue;
    }
  }
};

export const calcTextColor = (availibilityStatus, colors) => {
  switch (availibilityStatus) {
    case FREE: {
      return colors.blue;
    }
    default: {
      return colors.white;
    }
  }
};
