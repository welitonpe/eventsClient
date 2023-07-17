export type BaseModalProps = {
  children: JSX.Element;
  close: () => void;
  open: () => void;
  opened: boolean;
  titleModal?: string;
  triggerCompatct?: boolean;
  triggerRadius?: string;
  triggerName?: string;
  variant?: string;
};

export type GuestOutlet = {
  loged: boolean;
};

export type LogInProps = {
  triggerOptions?: {
    compatct?: boolean;
    radius?: string;
    name?: string;
  };
};

export type SignUpModalProps = {
  triggerOptions?: {
    compatct?: boolean;
    radius?: string;
    name?: string;
  };
};

export type UserIconProps = {
  name: string;
  URL: string;
};
