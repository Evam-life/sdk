const InternalErrorRepository = {
  util: {
    splitNotificationIdSuffix: {
      idTooShort: (id: string) => `notification id "${id}" too short`,
      isInvalidCallbackIdSuffix: (suffix: string) =>
        `callback id suffix "${suffix}" is invalid (must be either "-p" or "-s")`,
    },
  },
};

export default InternalErrorRepository;
