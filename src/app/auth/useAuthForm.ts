import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { PUBLIC_URL } from '@/config/url.config';

import { authService } from '@/services/auth/auth.service';

import { IAuthForm } from '@/shared/types/auth.interface';

export function useAuthForm(isReg: boolean) {
  const router = useRouter();

  const form = useForm<IAuthForm>({
    mode: 'onChange'
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['auth user'],
    mutationFn: (data: IAuthForm) =>
      authService.main(isReg ? 'register' : 'login', data),
    onSuccess() {
      form.reset();
      toast.success('Successful authorization');
      router.replace(PUBLIC_URL.home());
    },
    onError(error: any) {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('Auth Error');
      }
    }
  });

  const onSubmit: SubmitHandler<IAuthForm> = data => {
    mutate(data);
  };

  return { onSubmit, form, isPending };
}
