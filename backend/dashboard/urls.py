from django.urls import path
from .views import DashboardStatsView, AdminAnalyticsView, BusinessSettingsView

urlpatterns = [
    path('dashboard/', DashboardStatsView.as_view(), name='dashboard'),
    path('analytics/', AdminAnalyticsView.as_view(), name='analytics'),
    path('settings/', BusinessSettingsView.as_view(), name='settings'),
]
