from django.db import models
from django.contrib.auth import get_user_model
import uuid
from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator

User = get_user_model()
class SubscriptionPlan(models.Model):
    PLAN_TYPES = [
        ('free', 'Free'),
        ('basic', 'Basic'),
        ('premium', 'Premium'),
        ('enterprise', 'Enterprise'),
    ]
    
    BILLING_PERIODS = [
        ('monthly', 'Monthly'),
        ('quarterly', 'Quarterly'),
        ('yearly', 'Yearly'),
        ('lifetime', 'Lifetime'),
    ]
    
    CURRENCY_CHOICES = [
        ('USD', 'US Dollar'),
        ('EUR', 'Euro'),
        ('SAR', 'Saudi Riyal'),
        ('AED', 'Dirham UAE'),
       
    ]
    
    
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    plan_type = models.CharField(max_length=20, choices=PLAN_TYPES, default='free')
    billing_period = models.CharField(max_length=20, choices=BILLING_PERIODS, default='monthly')
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, default='USD')
    is_active = models.BooleanField(default=True)
    features = models.JSONField(default=dict, help_text="JSON object containing plan features and limits")
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'subscription_plan'
        ordering = ['price']
    
    def __str__(self):
        return f"{self.name} ({self.get_billing_period_display()}) - {self.price} {self.currency}"

class UserSubscription(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('pending', 'Pending'),
        ('canceled', 'Canceled'),
        ('expired', 'Expired'),
        ('past_due', 'Past Due'),
        ('trialing', 'Trialing'),
    ]
    
    
    user = models.OneToOneField('AuthUser', on_delete=models.CASCADE, related_name='subscription')
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.CASCADE, related_name='subscriptions')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    current_period_start = models.DateTimeField()
    current_period_end = models.DateTimeField()
    cancel_at_period_end = models.BooleanField(default=False)
    canceled_at = models.DateTimeField(blank=True, null=True)
    trial_start = models.DateTimeField(blank=True, null=True)
    trial_end = models.DateTimeField(blank=True, null=True)
    stripe_subscription_id = models.CharField(max_length=100, blank=True, null=True, unique=True)
    stripe_customer_id = models.CharField(max_length=100, blank=True, null=True)
    metadata = models.JSONField(default=dict)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'user_subscription'
    
    def __str__(self):
        return f"{self.user.username} - {self.plan.name} ({self.status})"
    
    @property
    def is_active(self):
        return self.status == 'active' and self.current_period_end > timezone.now()
    
    @property
    def is_trialing(self):
        return self.status == 'trialing' and self.trial_end and self.trial_end > timezone.now()

class SubscriptionPayment(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('succeeded', 'Succeeded'),
        ('pending', 'Pending'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
        ('requires_action', 'Requires Action'),
    ]
    
    PAYMENT_METHOD_TYPES = [
        ('card', 'Credit Card'),
        ('paypal', 'PayPal'),
        ('bank_transfer', 'Bank Transfer'),
        ('apple_pay', 'Apple Pay'),
        ('google_pay', 'Google Pay'),
    ]
    
    
    subscription = models.ForeignKey(UserSubscription, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, choices=SubscriptionPlan.CURRENCY_CHOICES, default='USD')
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    payment_method_type = models.CharField(max_length=20, choices=PAYMENT_METHOD_TYPES, default='card')
    stripe_payment_intent_id = models.CharField(max_length=100, blank=True, null=True, unique=True)
    stripe_invoice_id = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    metadata = models.JSONField(default=dict)
    paid_at = models.DateTimeField(blank=True, null=True)
    refunded_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        db_table = 'subscription_payment'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Payment {self.amount} {self.currency} - {self.status}"

class SubscriptionInvoice(models.Model):
    INVOICE_STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('open', 'Open'),
        ('paid', 'Paid'),
        ('void', 'Void'),
        ('uncollectible', 'Uncollectible'),
    ]
    
    
    subscription = models.ForeignKey(UserSubscription, on_delete=models.CASCADE, related_name='invoices')
    amount_due = models.DecimalField(max_digits=10, decimal_places=2)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    currency = models.CharField(max_length=3, choices=SubscriptionPlan.CURRENCY_CHOICES, default='USD')
    status = models.CharField(max_length=20, choices=INVOICE_STATUS_CHOICES, default='draft')
    stripe_invoice_id = models.CharField(max_length=100, blank=True, null=True, unique=True)
    invoice_number = models.CharField(max_length=50, unique=True)
    invoice_pdf_url = models.URLField(blank=True, null=True)
    period_start = models.DateTimeField()
    period_end = models.DateTimeField()
    due_date = models.DateTimeField(blank=True, null=True)
    paid_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'subscription_invoice'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Invoice #{self.invoice_number} - {self.amount_due} {self.currency}"

class Coupon(models.Model):
    DISCOUNT_TYPES = [
        ('percentage', 'Percentage'),
        ('fixed_amount', 'Fixed Amount'),
    ]
    
    DURATION_TYPES = [
        ('once', 'Once'),
        ('repeating', 'Repeating'),
        ('forever', 'Forever'),
    ]
    
    
    code = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True, null=True)
    discount_type = models.CharField(max_length=20, choices=DISCOUNT_TYPES)
    discount_value = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    duration = models.CharField(max_length=20, choices=DURATION_TYPES, default='once')
    duration_in_months = models.IntegerField(blank=True, null=True, help_text="Required if duration is 'repeating'")
    max_redemptions = models.IntegerField(blank=True, null=True, help_text="Maximum number of times this coupon can be redeemed")
    redeem_by = models.DateTimeField(blank=True, null=True, help_text="Date after which the coupon can no longer be redeemed")
    is_active = models.BooleanField(default=True)
    applies_to_plans = models.ManyToManyField(SubscriptionPlan, blank=True, related_name='coupons')
    metadata = models.JSONField(default=dict)
    created_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        db_table = 'coupon'
    
    def __str__(self):
        return f"Coupon: {self.code} - {self.discount_value}{'%' if self.discount_type == 'percentage' else ''}"

class SubscriptionUsage(models.Model):
    
    subscription = models.ForeignKey(UserSubscription, on_delete=models.CASCADE, related_name='usage_records')
    date = models.DateField(default=timezone.now)
    meals_used = models.IntegerField(default=0)
    calculations_used = models.IntegerField(default=0)
    nutritionist_consultations = models.IntegerField(default=0)
    drug_interaction_checks = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'subscription_usage'
        unique_together = [['subscription', 'date']]
        ordering = ['-date']
    
    def __str__(self):
        return f"Usage for {self.subscription.user.username} on {self.date}"
    
    @property
    def meals_remaining(self):
        return max(0, self.subscription.plan.max_meals - self.meals_used)
    
    @property
    def calculations_remaining(self):
        return max(0, self.subscription.plan.max_calculations - self.calculations_used)
