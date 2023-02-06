import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITutorialState {
  isActive: boolean;
  advanceListener: any;
  home: any;
  team: {
    teamBoard: {
      zIndex: number;
      scale: number;
    };
    playerCard: {
      scale: number;
    };
    forward: {
      borderColor: string;
      scale: number;
    };
    defense: {
      borderColor: string;
      scale: number;
    };
    goalie: {
      borderColor: string;
      scale: number;
    };
    scoutStick: {
      scale: number;
    };
  };
  scout: {
    availablePlayersBoard: {
      scale: number;
      opacity: number;
    };
    offeredPlayersBoard: {
      scale: number;
      opacity: number;
    };
    moneyLevel1: {
      scale: number;
      opacity: number;
    };
    moneyLevel2: {
      scale: number;
      opacity: number;
    };
    moneyLevel3: {
      scale: number;
      opacity: number;
    };
    finishedBtn: {
      scale: number;
      opacity: number;
    };
  };
  budget: {
    equationBoard: {
      scale: number;
      opacity: number;
    };
    total: {
      scale: number;
      opacity: number;
    };
    spending: {
      scale: number;
      opacity: number;
    };
    savings: {
      scale: number;
      opacity: number;
    };
    slider: {
      scale: number;
      opacity: number;
      zIndex: number;
    };
    savingsIndicator: {
      opacity: number;
    };
  };
  season: {
    stats: {
      borderColor: string;
      backgroundColor: string;
      scale: number;
      zIndex: number;
    };
    standings: {
      borderColor: string;
      scale: number;
    };
    upcomingGames: {
      borderColor: string;
      scale: number;
      zIndex: number;
    };
    jumbotext: {
      borderColor: string;
      scale: number;
    };
    playButton: {
      scale: number;
    };
    studentRank: {
      scale: number;
    };
  };
}

const initialState: ITutorialState = {
  isActive: false,
  advanceListener: null,
  home: {},
  team: {
    teamBoard: {
      zIndex: 0,
      scale: 1,
    },
    playerCard: {
      scale: 1,
    },
    forward: {
      borderColor: '#f3901d',
      scale: 1,
    },
    defense: {
      borderColor: '#f3901d',
      scale: 1,
    },
    goalie: {
      borderColor: '#f3901d',
      scale: 1,
    },
    scoutStick: {
      scale: 1,
    },
  },
  scout: {
    availablePlayersBoard: {
      scale: 1,
      opacity: 1,
    },
    offeredPlayersBoard: {
      scale: 1,
      opacity: 1,
    },
    moneyLevel1: {
      scale: 1,
      opacity: 1,
    },
    moneyLevel2: {
      scale: 1,
      opacity: 1,
    },
    moneyLevel3: {
      scale: 1,
      opacity: 1,
    },
    finishedBtn: {
      scale: 1,
      opacity: 1,
    },
  },
  budget: {
    equationBoard: {
      scale: 1,
      opacity: 1,
    },
    total: {
      scale: 1,
      opacity: 1,
    },
    spending: {
      scale: 1,
      opacity: 1,
    },
    savings: {
      scale: 1,
      opacity: 1,
    },
    slider: {
      scale: 1,
      opacity: 1,
      zIndex: 0,
    },
    savingsIndicator: {
      opacity: 1,
    },
  },
  season: {
    stats: {
      borderColor: 'rgba(0,0,0,0)',
      backgroundColor: 'rgba(0,0,0,0)',
      scale: 1,
      zIndex: 0,
    },
    standings: {
      borderColor: '#707070',
      scale: 1,
    },
    upcomingGames: {
      borderColor: 'rgba(0,0,0,0)',
      scale: 1,
      zIndex: 0,
    },
    jumbotext: {
      borderColor: 'rgba(0,0,0,0)',
      scale: 1,
    },
    playButton: {
      scale: 1,
    },
    studentRank: {
      scale: 1,
    },
  },
};

const tutorialStateSlice = createSlice({
  name: 'TUTORIAL_STATE',
  initialState,
  reducers: {
    setAnimationState: (state, action: PayloadAction<any>) => {
      const componentStates = {};
      if (
        action.payload.animationStates &&
        action.payload.animationStates.length
      ) {
        action.payload.animationStates.forEach((s) => {
          componentStates[s.component] = {
            ...state[action.payload.page][s.component],
            ...s.state,
          };
        });
      }
      state[action.payload.page] = {
        ...state[action.payload.page],
        ...componentStates,
      };
    },

    setTutorialIsActive: (state, action: PayloadAction<any>) => {
      state.isActive = action.payload;
    },

    setAdvanceListener: (state, action: PayloadAction<any>) => {
      state.advanceListener = action.payload;
    },
  },
});

export const tutorialStateReducer = tutorialStateSlice.reducer;
export const { setAnimationState, setAdvanceListener, setTutorialIsActive } =
  tutorialStateSlice.actions;
