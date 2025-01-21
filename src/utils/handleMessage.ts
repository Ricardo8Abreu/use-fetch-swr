interface MessageConfig {
  error: {
      isError: boolean;
      message: string;
  };
  loading: {
      isLoading: boolean;
      message: string;
  };
  messageServer?: string;
}


const handleMessage = (props: MessageConfig) => {
    const {
        error: { isError, message: messageError = 'Error' },
        loading: { isLoading, message: messageLoading = 'Loading' },
        messageServer = null
    } = props;

    if (messageServer) return messageServer;
    if (isError) return messageError;
    if (isLoading) return messageLoading;

    return 'Ok';
};

export default handleMessage;
