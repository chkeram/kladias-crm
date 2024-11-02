from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class FishBase(BaseModel):
    name: str

class FishCreate(FishBase):
    quantity: int

class Fish(FishBase):
    id: int
    quantity: int

    class Config:
        from_attributes = True

class CustomerBase(BaseModel):
    name: str
    contact_info: Optional[str] = None

class CustomerCreate(CustomerBase):
    pass

class Customer(CustomerBase):
    id: int
    orders: List['Order'] = []

    class Config:
        from_attributes = True

class OrderItemBase(BaseModel):
    fish_id: int
    quantity: int

class OrderItemCreate(OrderItemBase):
    pass

class OrderItem(OrderItemBase):
    id: int
    fish: Fish

    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    customer_id: int

class OrderCreate(OrderBase):
    items: List[OrderItemCreate]

class Order(OrderBase):
    id: int
    order_date: datetime
    customer: Customer
    items: List[OrderItem]

    class Config:
        from_attributes = True
