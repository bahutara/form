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
    append(appendDefaults[itemField.type]);
  }

  return (
    <Box>
      <Label>{label}</Label>
      <Button variant="icon" onClick={add} type="button" icon="+" />

      {fields.map((item, i) => {
        return (
          <Box key={`ArrayField__${name}_${item.id}`}>
            {renderFields([`${name}[${i}]`, itemField])}
            <Button
              variant="icon"
              type="button"
              onClick={() => remove(i)}
              icon="-"
            />
          </Box>
        );
      })}
    </Box>
  );
}

function renderFields([name, fieldProps]: [string, Field]) {
  const { register } = useFormContext();

  if (fieldProps.type === 'text') {
    return <TextInput {...fieldProps} id={name} {...register} />;
  }
  if (fieldProps.type === 'email') {
    return <TextInput {...fieldProps} type="email" id={name} {...register} />;
  }
  if (fieldProps.type === 'password') {
    return (
      <TextInput {...fieldProps} type="password" id={name} {...register} />
    );
  }
  /*if (fieldProps.type === 'number') {
    return <TextInput type='number' {...fieldProps} id={name} />;
  }*/
  if (fieldProps.type === 'object') {
    return <ObjectField {...fieldProps} name={name} />;
  }
  if (fieldProps.type === 'array') {
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

        <button type="submit">Save</button>
      </form>
    </FormProvider>
  );
}
