import { debounce } from '@mui/material';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { useCallback, useEffect, useMemo, useState } from 'react';

export interface ClassValidationOptions {
  debounce?: number;
  validatorOptions?: ValidatorOptions;
}

export const useClassValidator = <T>(
  [cls, data]: [ClassConstructor<T>, T],
  options: ClassValidationOptions | null = {},
  /**
   * Dependencies
   */
  onChange: any[] = []
) => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const getErrorMessages = useCallback(
    (property: keyof T) => {
      const constraints = errors.find(
        (error) => error.property === property
      )?.constraints;

      if (!constraints) return [];

      return Object.values(constraints);
    },
    [errors]
  );

  const clear = useCallback(() => {
    setErrors([]);
  }, []);

  const validateFn = useMemo(
    () =>
      typeof options?.debounce === 'number' ? debounce(validate) : validate,
    [options?.debounce]
  );

  useEffect(() => {
    let isMounted = true;
    const instance = plainToInstance(cls, data) as any;

    validateFn(instance, {
      ...options?.validatorOptions,
      strictGroups: true,
    }).then((errors) => {
      if (isMounted) {
        setErrors(errors);
      }
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cls, options?.validatorOptions, validateFn, ...onChange]);

  const customValidator = useCallback(
    (options?: ValidatorOptions) => {
      const instance = plainToInstance(cls, data) as any;

      return validate(instance, options);
    },
    [cls, data]
  );

  return {
    result: { errors },
    setErrors,
    clear,
    getErrorMessages,
    validate: customValidator,
  };
};
