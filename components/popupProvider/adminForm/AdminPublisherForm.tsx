"use client";
import CommonDropDown from "@/components/common/CommonDropDown";
import CommonInputField from "@/components/common/CommonInputField";
import CommonLabel from "@/components/common/CommonLabel";
import { usePopupAction } from "@/context/popupStore";
import CancleIcon from "@/public/icons/cancleIcon.svg";
import { forwardRef, HTMLAttributes, useImperativeHandle } from "react";
import {
  Controller,
  FieldValues,
  useFieldArray,
  useForm,
} from "react-hook-form";

type Props = {
  className?: string;
  defaultValues?: AdminPublisherInputs;
} & HTMLAttributes<HTMLDivElement>;
export type AdminPublisherInputs = {
  publisherName: string;
  instagramId: string;
  isbns: { value: number | undefined }[];
  urls: {
    value: string;
    type: "Link" | "Youtube" | "Profile" | "Homepage" | "Blog";
  }[];
  memo?: string;
  tag?: string;
};
export type AdminPublisherFormRef = {
  handleSubmit: () => void;
};
const AdminPublisherForm = forwardRef<AdminPublisherFormRef, Props>(
  ({ className, defaultValues, ...props }, ref) => {
    const { register, handleSubmit, control } = useForm<AdminPublisherInputs>({
      mode: "onSubmit",
      defaultValues: defaultValues || {
        urls: [{ value: "", type: "Link" }],
        isbns: [{ value: undefined }],
      },
    });
    const { closePopup } = usePopupAction();
    const { fields, append, remove } = useFieldArray({
      control,
      name: "urls",
    });
    const {
      fields: isbnFields,
      append: appendIsbn,
      remove: removeIsbn,
    } = useFieldArray({
      control,
      name: "isbns",
    });
    const onSubmitHandler = (data: FieldValues) => {
      console.log(data);
      closePopup(); //성공시 모달 종료
    };
    const onErrorHandler = (data: FieldValues) => {
      console.log(data);
    };

    useImperativeHandle(
      ref,
      () => ({
        handleSubmit: handleSubmit(onSubmitHandler, onErrorHandler),
      }),
      [handleSubmit] // eslint-disable-line
    );

    return (
      <div
        className={`relative flex size-full flex-col ${className || ""}`}
        {...props}
      >
        <h2 className="flex justify-center text-sm font-semibold text-[var(--sub-color)]">
          Add Publisher
        </h2>
        <form
          className="relative flex size-full max-h-[80vh] flex-col gap-6 overflow-auto py-6"
          onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}
        >
          <div>
            <CommonLabel
              htmlFor="publisherName"
              className="text-[var(--highlight-color)]"
            >
              Publisher Name*
            </CommonLabel>
            <CommonInputField
              id="publisherName"
              {...register("publisherName", { required: "입력이 필요합니다" })}
            />
          </div>
          <div>
            <CommonLabel
              htmlFor="instagramId"
              className="text-[var(--highlight-color)]"
            >
              Instagram Id*
            </CommonLabel>
            <CommonInputField
              id="instagramId"
              {...register("instagramId", { required: "입력이 필요합니다" })}
            />
          </div>
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel>URL*</CommonLabel>
            {fields.map((_field, index) => (
              <div
                className="relative flex h-fit w-full flex-row gap-1"
                key={index}
              >
                <CommonInputField
                  placeholder="https://example.com"
                  type="url"
                  className="flex-[2]"
                  id={`url${index}`}
                  {...register(`urls.${index}.value`, {
                    required: "입력이 필요합니다",
                  })}
                />

                <Controller
                  name={`urls.${index}.type`}
                  control={control}
                  rules={{ required: "입력이 필요합니다" }}
                  render={({ field }) => (
                    <CommonDropDown
                      {...field}
                      className="flex-1"
                      optionItems={[
                        "Link",
                        "Youtube",
                        "Profile",
                        "Homepage",
                        "Blog",
                      ]}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-1 text-sm font-semibold text-[var(--highlight-color)]"
                >
                  <CancleIcon className="size-5" />
                </button>
              </div>
            ))}
            <div className="relative flex size-full flex-row justify-end gap-2">
              <button
                onClick={() => append({ value: "", type: "Link" })}
                className="text-sm font-semibold text-[var(--sub-color)]"
              >
                + Add
              </button>
            </div>
          </div>
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel
              htmlFor="isbn"
              className="text-[var(--highlight-color)]"
            >
              Book ISBN Number*
            </CommonLabel>
            {isbnFields.map((field, index) => (
              <div
                className="relative flex h-fit w-full flex-row gap-1"
                key={field + String(index)}
              >
                <CommonInputField
                  type="number"
                  id={`isbn${index}`}
                  {...register(`isbns.${index}.value`, {
                    required: "반드시 입력해야 합니다",
                    minLength: {
                      value: 10,
                      message: "10자리 이상 입력해야 합니다",
                    },
                    maxLength: {
                      value: 13,
                      message: "13자리 이하로 입력해야 합니다",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => removeIsbn(index)}
                  className="p-1 text-sm font-semibold text-[var(--highlight-color)]"
                >
                  <CancleIcon className="size-5" />
                </button>
              </div>
            ))}
            <div className="relative flex size-full flex-row justify-end gap-2">
              <button
                onClick={() => appendIsbn({ value: undefined })}
                className="text-sm font-semibold text-[var(--sub-color)]"
              >
                + Add
              </button>
            </div>
          </div>
          <div>
            <CommonLabel htmlFor="memo" className="text-[var(--sub-color)]">
              Memo
            </CommonLabel>
            <CommonInputField id="memo" {...register("memo")} />
          </div>
          <div>
            <CommonLabel htmlFor="tag" className="text-[var(--sub-color)]">
              Tag
            </CommonLabel>
            <CommonInputField id="tag" {...register("tag")} />
          </div>
        </form>
      </div>
    );
  }
);

AdminPublisherForm.displayName = "AdminContentForm";
export default AdminPublisherForm;
