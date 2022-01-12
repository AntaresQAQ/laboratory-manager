import { registerDecorator, ValidationOptions } from 'class-validator';

export function If<T>(
  callback: (value: T) => boolean,
  validationOptions?: ValidationOptions,
) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: T) {
          return callback(value);
        },
      },
    });
  };
}

// class-validator's IsPort accepts strings only, but I prefer
// writing port numbers as number
export function IsIntString(validationOptions?: ValidationOptions) {
  return If(
    value => Number.parseInt(value.toString()).toString() === value,
    validationOptions,
  );
}
