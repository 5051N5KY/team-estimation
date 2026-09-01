class TeamEstimationException(Exception):
    code = 0


class DeckDoesNotExistError(TeamEstimationException):
    code = 4001


class GameNotOngoingError(TeamEstimationException):
    code = 4002


class PlayerNotInGameError(TeamEstimationException):
    code = 4003


class GameDoesNotExistError(TeamEstimationException):
    code = 4004


class InvalidCardValueError(TeamEstimationException):
    code = 4005


class SpectatorCannotPlayError(TeamEstimationException):
    code = 4006
