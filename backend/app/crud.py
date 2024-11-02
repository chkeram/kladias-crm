from sqlalchemy.orm import Session
from . import models, schemas

# Customer CRUD operations
def get_customer(db: Session, customer_id: int):
    return db.query(models.Customer).filter(models.Customer.id == customer_id).first()

def get_customers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Customer).offset(skip).limit(limit).all()

def create_customer(db: Session, customer: schemas.CustomerCreate):
    db_customer = models.Customer(name=customer.name, contact_info=customer.contact_info)
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

# Fish CRUD operations
def get_fish(db: Session):
    return db.query(models.Fish).all()

def create_fish(db: Session, fish: schemas.FishCreate):
    db_fish = models.Fish(name=fish.name, quantity=fish.quantity)
    db.add(db_fish)
    db.commit()
    db.refresh(db_fish)
    return db_fish

# Order CRUD operations
def create_order(db: Session, order: schemas.OrderCreate):
    db_order = models.Order(customer_id=order.customer_id)
    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    # Add order items
    for item in order.items:
        db_item = models.OrderItem(order_id=db_order.id, fish_id=item.fish_id, quantity=item.quantity)
        db.add(db_item)
        # Update fish quantity
        fish = db.query(models.Fish).filter(models.Fish.id == item.fish_id).first()
        if fish.quantity < item.quantity:
            raise ValueError(f"Not enough {fish.name} in stock.")
        fish.quantity -= item.quantity
    db.commit()
    db.refresh(db_order)
    return db_order

def get_orders_by_customer(db: Session, customer_id: int):
    return db.query(models.Order).filter(models.Order.customer_id == customer_id).all()
