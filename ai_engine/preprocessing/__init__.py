"""Preprocessing module for cleaning and preparing raw datasets."""

from typing import List, Dict
import pandas as pd


def clean_transactions(raw_data: List[Dict]) -> List[Dict]:
    if not raw_data:
        return []
    df = pd.DataFrame(raw_data)
    df = df.dropna(subset=["scheme", "department", "amount", "date"])
    df["amount"] = pd.to_numeric(df["amount"], errors="coerce")
    df = df.dropna(subset=["amount"])
    df["date"] = pd.to_datetime(df["date"], errors="coerce")
    df = df.dropna(subset=["date"])
    df["date"] = df["date"].dt.strftime("%Y-%m-%d")
    return df.to_dict(orient="records")


def clean_schemes(raw_data: List[Dict]) -> List[Dict]:
    if not raw_data:
        return []
    df = pd.DataFrame(raw_data)
    df = df.dropna(subset=["name", "department", "budget", "beneficiaries"])
    df["budget"] = pd.to_numeric(df["budget"], errors="coerce")
    df["beneficiaries"] = pd.to_numeric(df["beneficiaries"], errors="coerce")
    df = df.dropna(subset=["budget", "beneficiaries"])
    return df.to_dict(orient="records")
