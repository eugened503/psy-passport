import { computed, reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { useStore } from "vuex";
import {
  required,
  minLength,
  maxLength,
  helpers,
  email,
} from "@vuelidate/validators";

export default function useFormContent(action) {
  const store = useStore();
  const getError = computed(() => store.state.user.error);
  const clearError = () => store.commit("user/clear_error");

  const form = reactive({
    email: "",
    password: "",
    name: "",
  });

  const rules = computed(() => {
    const localRules = {
      email: {
        $autoDirty: true,
        required: helpers.withMessage("Поле является обязательным", required),
        email: helpers.withMessage("Некорректный e-mail", email),
      },
      password: {
        $autoDirty: true,
        minLength: helpers.withMessage(
          "Минимальная длина пароля - 8 символов",
          minLength(8)
        ),
        required: helpers.withMessage("Поле является обязательным", required),
      },
      name: {
        $autoDirty: true,
        required: helpers.withMessage("Поле является обязательным", required),
        minLength: helpers.withMessage(
          "Минимальная длина имени - 2 символа",
          minLength(2)
        ),
        maxLength: helpers.withMessage(
          "Максимальная длина имени - 30 символов",
          maxLength(30)
        ),
      },
    };

    if (action === "user/login") {
        delete localRules.name;
    }

    return localRules;
  });

  const submitForm = async () => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) return;
    if (action === "user/login") {
      console.log("user/login");
      const { email, password } = form;
      console.log(email, password);
      store.dispatch(action, { email, password });
    } else {
      store.dispatch(action, form);
    }
  };

  const v$ = useVuelidate(rules, form);

  console.log(rules.value);
  console.log(v$.value);

  return { form, getError, submitForm, clearError, v$ };
}
