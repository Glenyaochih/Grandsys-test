import { BsFilter } from 'react-icons/bs';

//待辦事項類型定義;
interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
}

// 篩選類型
type FilterType = 'all' | 'completed' | 'incomplete';

export default function ToDoApp() {
  return (
    <>
      <div className='to-do'>
        <div className='container'>
          <div>
            <h1 className='py-3'>TODO</h1>
          </div>
          <hr className='thick-hr' />
          {/* 搜尋框 */}
          <div className='d-sm-flex'>
            <div className='add-to-do'>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='新增待辦清單'
                  aria-label='新增待辦清單'
                  aria-describedby='button-addon2'
                />
                <button
                  className='btn btn-outline-secondary'
                  type='button'
                  id='button-addon2'
                >
                  新增
                </button>
              </div>
            </div>
            {/* 篩選 */}
            <section className='ms-auto'>
              <div>
                <div className='dropdown'>
                  <a
                    className='btn'
                    type='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    <BsFilter size={24} />
                  </a>
                  <ul className='dropdown-menu dropdown-menu-end'>
                    <li>
                      <button className='dropdown-item ' type='button'>
                        全部
                      </button>
                    </li>
                    <li>
                      <button className='dropdown-item' type='button'>
                        未完成
                      </button>
                    </li>
                    <li>
                      <button className='dropdown-item' type='button'>
                        已完成
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
          {/* 渲染區 */}
          <div className='row row-cols-1 row-cols-md-4'>
            <div className='col'></div>
          </div>
        </div>
      </div>
    </>
  );
}

// describe('ToDoApp', () => {
//   // 測試 1: 新增待辦事項
//   // 測試 2: 切換完成狀態
//   // 可以增加更多測試案例
// });
