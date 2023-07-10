import { computed, reactive } from "vue";
import { useStoreUser } from "../stores/storeUser";
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  helpers,
  email,
} from "@vuelidate/validators";
import { storeToRefs } from "pinia";
export default function useFormContent(action) {
  const { clearError, register, login } = useStoreUser();
  const { getLoaded, getError } = storeToRefs(useStoreUser());

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

    if (action === "login") {
      delete localRules.name;
    }

    return localRules;
  });

  const submitForm = async () => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) return;
    if (action === "login") {
      const { email, password } = form;
      login({ email, password });
    } else {
      register(form);
    }
  };

  const v$ = useVuelidate(rules, form);

  return { form, getError, getLoaded, submitForm, clearError, v$ };
}
