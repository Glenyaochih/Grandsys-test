import { render, screen, fireEvent, within } from '@testing-library/react';
import ToDoApp from './ToDoApp';

describe('ToDoApp', () => {
  test('新增待辦事項', () => {
    render(<ToDoApp />);
    const inputElement = screen.getByPlaceholderText(/新增待辦清單/i);
    const addButton = screen.getByText(/新增/i);

    fireEvent.change(inputElement, { target: { value: 'todo測試' } });
    fireEvent.click(addButton);

    const todoItem = screen.getByText('todo測試');
    expect(todoItem).toBeInTheDocument();
  });

  test('切換狀態', () => {
    render(<ToDoApp />);
    const inputElement = screen.getByPlaceholderText(/新增待辦清單/i);
    const addButton = screen.getByText(/新增/i);

    // 新增待辦事項
    fireEvent.change(inputElement, { target: { value: '切換狀態測試' } });
    fireEvent.click(addButton);

    // 鎖定卡片
    const todoCard = screen
      .getByText('切換狀態測試')
      .closest('.card') as HTMLElement;
    expect(todoCard).toBeInTheDocument();

    // 從卡片中找 checkbox
    const checkbox = within(todoCard).getByRole('checkbox') as HTMLInputElement;

    // 初始為未完成
    const statusBadge = within(todoCard).getByText('未完成');
    expect(statusBadge).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    // 切換
    fireEvent.click(checkbox);

    // 驗證已完成
    const updatedStatusBadge = within(todoCard).getByText('已完成');
    expect(updatedStatusBadge).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });
});
