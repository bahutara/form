import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Form, FormProps } from '../src';

const meta: Meta = {
  title: 'Form',
  component: Form,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<FormProps> = args => <Form {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

const fields: FormProps['fields'] = {
  email: {
    fieldType: 'email',
    label: 'Email',
  },

  count: {
    fieldType: 'number',
    label: 'Count',
  },

  myArray: {
    fieldType: 'array',
    label: 'My array',
    itemField: {
      fieldType: 'text',
      label: 'Array text',
    },
  },

  kv: {
    fieldType: 'array',
    label: 'Headers',
    itemField: {
      fieldType: 'object',
      label: 'Header fielders',
      properties: {
        key: {
          fieldType: 'text',
          label: 'key',
        },
        value: {
          fieldType: 'text',
          label: 'Value',
        },
      },
    },
  },

  myObj: {
    fieldType: 'object',
    label: 'Count',
    properties: {
      mySubObject: {
        fieldType: 'email',
        label: 'My sub property',
      },
    },
  },
};

Default.args = {
  fields,
  onSubmit: values => {
    console.log('values', values);
  },
};
