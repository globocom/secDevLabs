import logging


def error(action, error, username):
    logging.error('action:{}, error:{}, username:{}'.format(action,
                                                            error,
                                                            username))


def info(action, message, username):
    logging.info('action:{}, message:{}, username:{} '.format(message,
                                                              action,
                                                              username))
