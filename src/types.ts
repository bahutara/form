import { SubmitHandler, FieldValues } from 'react-hook-form';
type FieldSchema = {
  fieldType: 'text' | 'number' | 'email' | 'password' | 'search' | 'url' | 'array' | 'object';
};

type DefaultProps = {
  label: string;
  placeholder?: string;
};

export type TextFieldProps = FieldSchema &
  DefaultProps & {
    fieldType: 'text' | 'email' | 'password';
  };

export type NumberFieldProps = FieldSchema &
  DefaultProps & {
    fieldType: 'number';
    min?: number;
    max?: number;
  };

export type ObjectFieldProps = FieldSchema &
  DefaultProps & {
    fieldType: 'object';
    properties: Fields;
  };

export type ArrayFieldProps = FieldSchema &
  DefaultProps & {
    fieldType: 'array';
    itemField: Field;
  };

export type Field =
  | TextFieldProps
  | NumberFieldProps
  | ObjectFieldProps
  | ArrayFieldProps;

type Fields = Record<string, Field>;

export interface FormProps {
  fields: Fields;
  onSubmit: SubmitHandler<FieldValues>;
}
