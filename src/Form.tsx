import React from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { Box, Button, Label, TextInput } from '@bahutara/design-system';
import { ArrayFieldProps, Field, FormProps, ObjectFieldProps } from './types';

function ObjectField(props: ObjectFieldProps & { name: string }) {
  const { label, name, properties } = props;

  return (
    <Box>
      <Label>{label}</Label>
      {Object.entries(properties).map(([fieldName, objectField]) => {
        return renderFields([`${name}.${fieldName}`, objectField]);
      })}
    </Box>
  );
}

const appendDefaults = {
  text: '',
  email: '',
  password: '',
  number: 0,
  array: [],
  object: {},
};

function ArrayField(props: ArrayFieldProps & { name: string }) {
  const { name, itemField, label } = props;

  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  function add() {
    append(appendDefaults[itemField.fieldType]);
  }

  return (
    <Box>
      <Label>{label}</Label>
      <Button
        variant="icon"
        onClick={add}
        type="button"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        }
      />

      {fields.map((item, i) => {
        return (
          <Box key={`ArrayField__${name}_${item.id}`}>
            {renderFields([`${name}[${i}]`, itemField])}
            <Button
              variant="icon"
              type="button"
              onClick={() => remove(i)}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 12h-15"
                  />
                </svg>
              }
            />
          </Box>
        );
      })}
    </Box>
  );
}

function renderFields([name, fieldProps]: [string, Field]) {
  const { register } = useFormContext();

  if (fieldProps.fieldType === 'text') {
    return (
      <TextInput
        id={name}
        aria-label={fieldProps.label}
        {...fieldProps}
        {...register}
      />
    );
  }
  if (fieldProps.fieldType === 'email') {
    return (
      <TextInput
        id={name}
        aria-label={fieldProps.label}
        {...fieldProps}
        type="email"
        {...register}
      />
    );
  }
  if (fieldProps.fieldType === 'password') {
    return (
      <TextInput
        id={name}
        aria-label={fieldProps.label}
        {...fieldProps}
        type="password"
        {...register}
      />
    );
  }
  if (fieldProps.fieldType === 'number') {
    return (
      <TextInput
        id={name}
        aria-label={fieldProps.label}
        {...fieldProps}
        type="number"
      />
    );
  }
  if (fieldProps.fieldType === 'object') {
    return <ObjectField {...fieldProps} name={name} />;
  }
  if (fieldProps.fieldType === 'array') {
    return <ArrayField {...fieldProps} name={name} />;
  }

  return <div>Unknown type</div>;
}

export function Form({ fields, onSubmit }: FormProps) {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {Object.entries(fields).map(renderFields)}

        <Button variant="primary" type="submit">
          Save
        </Button>
      </form>
    </FormProvider>
  );
}
