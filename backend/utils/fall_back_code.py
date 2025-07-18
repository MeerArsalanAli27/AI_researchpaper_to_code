
def fallback_code(content: str, framework: str, images: list, formulas: list) -> str:
    """Generate fallback code when CrewAI fails"""
    is_image_related = len(images) > 0 or any(keyword in content.lower() for keyword in ['image', 'cnn'])
    activation = "relu"
    loss = "CrossEntropyLoss" if framework.lower() == "pytorch" else "sparse_categorical_crossentropy"
    if formulas:
        for formula in formulas:
            if 'sigmoid' in formula.lower():
                activation = "sigmoid"
            if 'mse' in formula.lower():
                loss = "MSELoss" if framework.lower() == "pytorch" else "mean_squared_error"
    if framework.lower() == "pytorch":
        if is_image_related:
            return f'''
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
import numpy as np
class ImageDataset(Dataset):
    def __init__(self, data, labels):
        self.data = torch.tensor(data, dtype=torch.float32).permute(0, 3, 1, 2)
        self.labels = torch.tensor(labels, dtype=torch.long)
    def __len__(self):
        return len(self.data)
    def __getitem__(self, idx):
        return self.data[idx], self.labels[idx]
class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()
        self.conv1 = nn.Conv2d(3, 16, 3, padding=1)
        self.pool = nn.MaxPool2d(2)
        self.fc = nn.Linear(16 * 112 * 112, 10)
        self.relu = nn.{activation.capitalize()}()
    def forward(self, x):
        x = self.pool(self.relu(self.conv1(x)))
        x = x.view(x.size(0), -1)
        x = self.fc(x)
        return x
def train(model, loader):
    criterion = nn.{loss}()
    optimizer = optim.Adam(model.parameters())
    model.train()
    for epoch in range(5):
        for data, target in loader:
            optimizer.zero_grad()
            output = model(data)
            loss = criterion(output, target)
            loss.backward()
            optimizer.step()
def evaluate(model, loader):
    model.eval()
    correct = 0
    total = 0
    with torch.no_grad():
        for data, target in loader:
            outputs = model(data)
            _, predicted = torch.max(outputs, 1)
            total += target.size(0)
            correct += (predicted == target).sum().item()
    print(f"Accuracy: {{100 * correct / total:.2f}}%")
if __name__ == "__main__":
    data = np.random.rand(100, 224, 224, 3).astype(np.float32)
    labels = np.random.randint(0, 10, 100)
    dataset = ImageDataset(data, labels)
    loader = DataLoader(dataset, batch_size=32)
    model = CNN()
    train(model, loader)
    evaluate(model, loader)
'''
        else:
            return f'''
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
import numpy as np
class Dataset(Dataset):
    def __init__(self, data, labels):
        self.data = torch.tensor(data, dtype=torch.float32)
        self.labels = torch.tensor(labels, dtype=torch.long)
    def __len__(self):
        return len(self.data)
    def __getitem__(self, idx):
        return self.data[idx], self.labels[idx]
class MLP(nn.Module):
    def __init__(self):
        super(MLP, self).__init__()
        self.fc1 = nn.Linear(784, 64)
        self.fc2 = nn.Linear(64, 10)
        self.relu = nn.{activation.capitalize()}()
    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.fc2(x)
        return x
def train(model, loader):
    criterion = nn.{loss}()
    optimizer = optim.Adam(model.parameters())
    model.train()
    for epoch in range(5):
        for data, target in loader:
            optimizer.zero_grad()
            output = model(data)
            loss = criterion(output, target)
            loss.backward()
            optimizer.step()
def evaluate(model, loader):
    model.eval()
    correct = 0
    total = 0
    with torch.no_grad():
        for data, target in loader:
            outputs = model(data)
            _, predicted = torch.max(outputs, 1)
            total += target.size(0)
            correct += (predicted == target).sum().item()
    print(f"Accuracy: {{100 * correct / total:.2f}}%")
if __name__ == "__main__":
    data = np.random.rand(100, 784).astype(np.float32)
    labels = np.random.randint(0, 10, 100)
    dataset = Dataset(data, labels)
    loader = DataLoader(dataset, batch_size=32)
    model = MLP()
    train(model, loader)
    evaluate(model, loader)
'''
    else:  # TensorFlow
        if is_image_related:
            return f'''
import tensorflow as tf
import numpy as np
def prepare_data():
    x = np.random.rand(100, 224, 224, 3).astype(np.float32)
    y = np.random.randint(0, 10, 100)
    return x, y
def create_cnn():
    model = tf.keras.Sequential([
        tf.keras.layers.Conv2D(16, 3, padding='same', activation='{activation}', input_shape=(224, 224, 3)),
        tf.keras.layers.MaxPooling2D(),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(10, activation='softmax')
    ])
    return model
def train(model, x, y):
    model.compile(optimizer='adam', loss='{loss}', metrics=['accuracy'])
    model.fit(x, y, epochs=5, batch_size=32, verbose=0)
def evaluate(model, x, y):
    _, accuracy = model.evaluate(x, y, verbose=0)
    print(f"Accuracy: {{accuracy*100:.2f}}%")
if __name__ == "__main__":
    x, y = prepare_data()
    model = create_cnn()
    train(model, x, y)
    evaluate(model, x, y)
'''
        else:
            return f'''
import tensorflow as tf
import numpy as np
def prepare_data():
    x = np.random.rand(100, 784).astype(np.float32)
    y = np.random.randint(0, 10, 100)
    return x, y
def create_mlp():
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(64, activation='{activation}', input_shape=(784,)),
        tf.keras.layers.Dense(10, activation='softmax')
    ])
    return model
def train(model, x, y):
    model.compile(optimizer='adam', loss='{loss}', metrics=['accuracy'])
    model.fit(x, y, epochs=5, batch_size=32, verbose=0)
def evaluate(model, x, y):
    _, accuracy = model.evaluate(x, y, verbose=0)
    print(f"Accuracy: {{accuracy*100:.2f}}%")
if __name__ == "__main__":
    x, y = prepare_data()
    model = create_mlp()
    train(model, x, y)
    evaluate(model, x, y)
'''