import logging

logger = logging.getLogger(__name__)


class CookieLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print("START OF COOKIE MIDDLEWARE!!!")

        if request.COOKIES:
            print("!!!!", request.COOKIES)
            logger.info(f"Cookies received: {request.COOKIES}")
            if "refresh_token" in request.COOKIES:
                logger.info(
                    f"Refresh token cookie received: {request.COOKIES['refresh_token']}"
                )

        response = self.get_response(request)
        print("END OF COOKIE MIDDLEWARE!!!")
        return response
