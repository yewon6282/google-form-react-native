const CHANGETITLE = 'CHANGETITLE' as const;
const CHANGEEXPLANATION = 'CHANGEEXPLANATION' as const;

export const changeTitle = (value: string | null) => ({ type: CHANGETITLE, value });
export const changeExplanation = (value: string | null) => ({
  type: CHANGEEXPLANATION,
  value,
});

type ReviewingAction =
  | ReturnType<typeof changeTitle>
  | ReturnType<typeof changeExplanation>;

type ReviewingState = {
  title: string;
  explanation: string;
};

const initialState: ReviewingState = { title: '', explanation: '' };

function naming(state: ReviewingState = initialState, action: ReviewingAction) {
  switch (action.type) {
    case CHANGETITLE:
      return { title: action.value, explanation: state.explanation };
    case CHANGEEXPLANATION:
      return { title: state.title, explanation: action.value };
    default:
      return state;
  }
}

export default naming;
