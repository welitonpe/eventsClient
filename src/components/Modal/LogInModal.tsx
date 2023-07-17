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
import { LogInProps } from "../../types/Types";
import { authenticated } from "../../atoms/app.atom";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

type CreateUserForm = z.infer<typeof zodSchema.logIn>;

const LogIn: React.FC<LogInProps> = ({ triggerOptions }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useDisclosure(false);
  const [, setLoged] = useAtom(authenticated);
  const navigate = useNavigate();
  const { onSubmit, getInputProps, errors } = useForm<CreateUserForm>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(zodSchema.logIn),
  });

  const _onSubmit = async (form: any) => {
    setLoading.open();
    await fetcher(`${import.meta.env.VITE_BACKEND}/login`, {
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    setLoged(true);

    setLoading.close();

    navigate("/dashboard/home");
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
        variant="subtle"
      >
        <Container>
          <Title>{i18n.translate("log-in")}</Title>

          <form onSubmit={onSubmit(_onSubmit)}>
            <Group position="apart" mt="md" mb="xs">
              <TextInput
                data-autofocus
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
            </Group>

            <Group position="right" mt="xl" mb="xl">
              <Button
                variant="outline"
                color="gray"
                radius="md"
                onClick={() => close()}
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

export default LogIn;
