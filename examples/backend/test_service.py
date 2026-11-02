import unittest
from concurrent.futures import ThreadPoolExecutor
from service import OrderService

class TestOrderService(unittest.TestCase):
    def setUp(self):
        self.s = OrderService()
        self.order = {"sku": "SKU-001", "quantity": 3, "unit_price_cents": 2999}

    def test_create_replay_and_conflict(self):
        code, created = self.s.submit("key-1", self.order)
        self.assertEqual(code, 201)
        self.assertEqual(created["amount_cents"], 8997)
        code, repeated = self.s.submit("key-1", dict(reversed(list(self.order.items()))))
        self.assertEqual(code, 200)
        self.assertTrue(repeated["replayed"])
        self.assertEqual(repeated["id"], created["id"])
        self.assertEqual(self.s.submit("key-1", {**self.order, "quantity": 4})[0], 409)
        self.assertEqual(self.s.count(), 1)

    def test_validates_input(self):
        for body in [{}, [], None, {"sku": "BAD", "quantity": True, "unit_price_cents": 1},
                     {"sku": "BAD", "quantity": 0, "unit_price_cents": 1},
                     {"sku": "BAD", "quantity": 1, "unit_price_cents": -1}]:
            with self.subTest(body=body):
                self.assertEqual(self.s.submit("key-2", body)[0], 400)
        self.assertEqual(self.s.submit("space key", self.order)[0], 400)
        self.assertEqual(self.s.count(), 0)

    def test_concurrent_replay_is_at_most_once(self):
        with ThreadPoolExecutor(max_workers=8) as pool:
            responses = list(pool.map(lambda _: self.s.submit("same-key", self.order), range(40)))
        self.assertEqual(sum(status == 201 for status, _ in responses), 1)
        self.assertEqual(sum(status == 200 for status, _ in responses), 39)
        self.assertEqual(self.s.count(), 1)

if __name__ == "__main__":
    unittest.main()
