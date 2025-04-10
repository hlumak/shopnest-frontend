'use client';

import Image from 'next/image';
import { useState } from 'react';

import { useAuthForm } from '@/app/auth/useAuthForm';

import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/Card';
import { Form } from '@/components/ui/form-elements/Form';

import styles from './Auth.module.css';

export function Auth() {
  const [isReg, setIsReg] = useState(false);

  const { onSubmit, form, isPending } = useAuthForm(isReg);

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Image
          src="/images/auth.svg"
          alt="ShopNest auth"
          width={100}
          height={100}
        />
      </div>
      <div className={styles.right}>
        <Card className={styles.card}>
          <CardHeader className={styles.header}>
            <CardTitle>
              {isReg ? 'Create account' : 'Join to account'}
            </CardTitle>
            <CardDescription>
              Join or create account to buy products!
            </CardDescription>
          </CardHeader>
          <CardContent className={styles.content}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Button disabled={isPending}>Continue</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            {isReg ? 'Already has an account?' : "Don't have an account?"}
            <button onClick={() => setIsReg(!isReg)}>
              {isReg ? 'Join' : 'Create'}
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
