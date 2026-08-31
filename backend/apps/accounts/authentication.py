import jwt
import time
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model

User = get_user_model()

JWT_SECRET = getattr(settings, 'SECRET_KEY', 'ph-digital-secret')
JWT_ALGORITHM = 'HS256'
ACCESS_TOKEN_LIFETIME = 3600  # 1 hour
REFRESH_TOKEN_LIFETIME = 86400 * 7  # 7 days

def generate_tokens_for_user(user):
    now = int(time.time())
    access_payload = {
        'user_id': user.id,
        'username': user.username,
        'email': user.email,
        'role': user.role,
        'type': 'access',
        'iat': now,
        'exp': now + ACCESS_TOKEN_LIFETIME,
    }
    refresh_payload = {
        'user_id': user.id,
        'type': 'refresh',
        'iat': now,
        'exp': now + REFRESH_TOKEN_LIFETIME,
    }
    access_token = jwt.encode(access_payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    refresh_token = jwt.encode(refresh_payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return {
        'access': access_token,
        'refresh': refresh_token,
        'expires_in': ACCESS_TOKEN_LIFETIME,
    }

class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return None

        token = parts[1]
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token đã hết hạn. Vui lòng đăng nhập lại.')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Token không hợp lệ.')

        if payload.get('type') != 'access':
            raise AuthenticationFailed('Loại token không được phép sử dụng để xác thực API.')

        try:
            user = User.objects.get(id=payload['user_id'])
        except User.DoesNotExist:
            raise AuthenticationFailed('Người dùng không tồn tại.')

        if not user.is_active:
            raise AuthenticationFailed('Tài khoản đã bị tạm khóa.')

        return (user, token)
