import {useLocation, useRoute} from 'wouter'
import {useEffect} from 'react'

import ConnectionListContainer from '../components/connections/ConnectionListContainer'
import {offDeleteConnection, onDeleteConnection} from '../utils/api'

const useDeleteConnectionEvent = () => {
  const {deleteConnection} = ConnectionListContainer.useContainer()

  const [match, params] = useRoute('/connections/:id')
  const [, setLocation] = useLocation()

  useEffect(() => {
    onDeleteConnection(id => {
      deleteConnection(id)

      // 如果删除的 connection 和当前页面的 connection 相同则返回首页
      if (match && params.id === id) {
        setLocation('/')
      }
    })

    return () => {
      offDeleteConnection()
    }
  }, [params])
}

export default useDeleteConnectionEvent