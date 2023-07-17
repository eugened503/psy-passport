import randomKey from "@/utils/randomKey";

export default function useTestContent(
  questionIndex,
  answers,
  deleteResults,
  getItem,
  questions
) {
  const next = () => {
    questionIndex.value++;
  };

  const prev = () => {
    questionIndex.value--;
  };

  const reset = () => {
    questionIndex.value = 0;
  };

  const addRes = ({ index, res }) => {
    answers.value[index] = res;
  };

  const points = (arr) => {
    return arr.reduce((accumulator, current, index) => {
      if (answers.value[index] === current) {
        accumulator.push(index);
      }
      return accumulator;
    }, []);
  };

  const keys = (arrInTrue, arrInFalse, arr) => {
    arrInTrue.forEach((i) => {
      arr[i - 1] = true;
    });
    arrInFalse.forEach((i) => {
      arr[i - 1] = false;
    });
  };

  const deleteData = () => {
    const id = getItem.value._id;
    deleteResults(id);
    questionIndex.value = 0;
    answers.value = [];
  };

  questions.forEach((question) => {
    question.responses = [
      { text: "Да", response: true },
      { text: "Нет", response: false },
    ];
    question.id = randomKey();
    question.responses.forEach((res) => {
      res.id = randomKey();
    });
  });

  return { next, prev, reset, addRes, points, keys, deleteData };
}
