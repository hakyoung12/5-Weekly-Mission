import styles from "./AuthForm.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRef } from "react";

interface SigninFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SigninFormValues>();

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("password");

  const onSubmit: SubmitHandler<SigninFormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
      <div className={styles.inputGroup}>
        <label htmlFor="email">아이디</label>
        <input
          id="email"
          type="email"
          placeholder="이메일을 입력해주세요."
          {...register("email", {
            required: { value: true, message: "이메일을 입력해주세요" },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "이메일 형식이 올바르지 않습니다",
            },
          })}
        />
        {<p className={styles.errorMessage}>{errors.email?.message}</p>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          {...register("password", {
            required: {
              value: true,
              message: "영문, 숫자를 조합해 8자 이상 입력해 주세요.",
            },
            minLength: {
              value: 8,
              message: "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: "비밀번호는 영문과 숫자 조합 8자 이상 입력해 주세요.",
            },
          })}
        />
        <p className={styles.errorMessage}>{errors.password?.message}</p>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          id="passwordConfirm"
          type="password"
          placeholder="비밀번호와 일치하는 값을 입력해 주세요."
          {...register("passwordConfirm", {
            required: { value: true, message: "비밀번호가 일치하지 않아요." },
            validate: (value) =>
              value === passwordRef.current || "비밀번호가 일치하지 않아요.",
          })}
        />
        <p className={styles.errorMessage}>{errors.passwordConfirm?.message}</p>
      </div>
      <button className={styles.signinButton} type="submit">
        로그인
      </button>
    </form>
  );
}

export default SigninForm;
