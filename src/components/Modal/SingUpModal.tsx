import {
  Button,
  Group,
  Container,
  Title,
  TextInput,
  Loader,
} from "@mantine/core";
import i18n from "../../i18n";
import zodSchema, { zodResolver } from "../../schema/zod";
import { z } from "zod";
import fetcher from "../../services/fetcher";
import { useForm } from "@mantine/form";
import BaseModal from "./Modal";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { SignUpModalProps } from "../../types/Types";

type CreateUserForm = z.infer<typeof zodSchema.createUser>;

const SignUpModal: React.FC<SignUpModalProps> = ({ triggerOptions }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useDisclosure(false);
  const { onSubmit, getInputProps, errors, reset } = useForm<CreateUserForm>({
    initialValues: {
      name: "",
      familyName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: zodResolver(zodSchema.createUser),
  });

  const _onSubmit = async (form: CreateUserForm) => {
    setLoading.open();

    try {
      const test = await fetcher(`${import.meta.env.VITE_BACKEND}/user`, {
        body: JSON.stringify({
          name: form.name,
          familyName: form.familyName,
          email: form.email,
          password: form.password,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      notifications.show({
        title: i18n.translate("user-created-with-success"),
        message: `The user ${test.name} was created with success`,
        icon: <IconCheck size="1.1rem" />,
        autoClose: 5000,
        color: "teal",
      });

      reset();
      close();
    } catch (error) {
      setLoading.close();

      notifications.show({
        title: i18n.translate("user-created-with-success"),
        message: `The user ${error} was created with success`,
        icon: <IconX size="1.1rem" />,
        autoClose: 5000,
        color: "red",
      });
    }
    setLoading.close();
  };

  return (
    <>
      <BaseModal
        opened={opened}
        open={open}
        close={close}
        triggerCompatct={triggerOptions?.compatct}
        triggerName={triggerOptions?.name}
        triggerRadius={triggerOptions?.radius}
      >
        <Container>
          <Title>{i18n.translate("sign-up")}</Title>

          <form onSubmit={onSubmit(_onSubmit)}>
            <Group position="apart" mt="md" mb="xs">
              <TextInput
                data-autofocus
                error={errors["name"]}
                withAsterisk
                label={i18n.translate("name")}
                placeholder={i18n.translate("name")}
                {...getInputProps("name")}
                w="100%"
              />

              <TextInput
                error={errors["familyName"]}
                withAsterisk
                label={i18n.translate("family-name")}
                placeholder={i18n.translate("family-name")}
                {...getInputProps("familyName")}
                w="100%"
              />

              <TextInput
                error={errors["email"]}
                withAsterisk
                label={i18n.translate("email")}
                placeholder={i18n.translate("email")}
                {...getInputProps("email")}
                w="100%"
              />
            </Group>

            <Group position="apart" mt="xl" mb="xl">
              <TextInput
                type="password"
                error={errors["password"]}
                withAsterisk
                label={i18n.translate("password")}
                placeholder={i18n.translate("password")}
                {...getInputProps("password")}
                w="100%"
              />

              <TextInput
                type="password"
                error={errors["confirmPassword"]}
                withAsterisk
                label={i18n.translate("confirm-password")}
                placeholder={i18n.translate("confirm-password")}
                {...getInputProps("confirmPassword")}
                w="100%"
              />
            </Group>

            <Group position="right" mt="xl" mb="md">
              <Button
                variant="outline"
                color="gray"
                radius="md"
                onClick={() => {
                  reset();
                  close();
                }}
              >
                {i18n.translate("cancel")}
              </Button>
              <Button type="submit">
                {loading ? (
                  <Loader size="xs" color="teal" variant="dots" />
                ) : (
                  i18n.translate("submit")
                )}
              </Button>
            </Group>
          </form>
        </Container>
      </BaseModal>
    </>
  );
};

export default SignUpModal;
